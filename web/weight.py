import argparse
from matplotlib import axis
from torchvision import transforms, utils
import os
from PIL import Image
from pathlib import Path

import torch
from torchvision import utils
from model import Generator, Encoder
from torch.utils import data

TRANSFORM = transforms.Compose(
    [transforms.ToTensor(), transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))]
)


def get_name(path):
    name, _ = os.path.splitext(os.path.basename(path))
    return name


def generate(args, g_ema, encoder, device, mean_latent, test_path, size):
    # 가중치 변화 없이
    with torch.no_grad():
        # 평가 모드 키기
        g_ema.eval()
        encoder.eval()

        # Get a list of the src characters.
        content = Path("img/content")
        content_img = content / "밤.png"

        style = Path("img/style")
        thin = style / "Thing.png"
        bold = style / "ExtraBold.png"

        style_thin = TRANSFORM(Image.open(thin).convert("RGB")).to(device)
        style_thin_feat = encoder(style_thin.unsqueeze(0))

        style_bold = TRANSFORM(Image.open(bold).convert("RGB")).to(device)
        style_bold_feat = encoder(style_bold.unsqueeze(0))

        result = []
        content_tensor = TRANSFORM(Image.open(content_img).convert("RGB")).to(device)
        cnt_feats = encoder(content_tensor.unsqueeze(0))

        axis, _ = g_ema([cnt_feats[-1], ])

        weight_index = torch.argmax(abs(style_bold - style_thin))
        print(weight_index)
        weight_interpolation = torch.linspace(, ,step=6)

        # sample, _ = g_ema(
        #     [cnt_feats[-1], style_feat[-1]],
        #     inject_index=4,
        #     input_is_latent=True,
        # )
        #     result.append(sample)

        # result = torch.cat(
        #     (result[0].squeeze(0), result[1].squeeze(0), result[0].squeeze(0)),
        #     dim=-1,
        # )

        # utils.save_image(
        #     result, f"./img/style_{i}_{j}.png", normalize=True, range=(-1, 1),
        # )

    print("DONE")


if __name__ == "__main__":
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    print("Device chosen is ", device)

    parser = argparse.ArgumentParser(description="Generate samples from the generator")

    parser.add_argument(
        "--size", type=int, default=128, help="output image size of the generator"
    )
    parser.add_argument(
        "--sample",
        type=int,
        default=1,
        help="number of samples to be generated for each image",
    )
    parser.add_argument(
        "--pics", type=int, default=30, help="number of images to be generated"
    )
    parser.add_argument("--truncation", type=float, default=1, help="truncation ratio")
    parser.add_argument(
        "--truncation_mean",
        type=int,
        default=4096,
        help="number of vectors to calculate mean for the truncation",
    )
    parser.add_argument(
        "--ckpt",
        type=str,
        default="checkpoint/140000.pt",
        help="path to the model checkpoint",
    )
    parser.add_argument(
        "--channel_multiplier",
        type=int,
        default=1,
        help="channel multiplier of the generator. config-f = 2, else = 1",
    )

    args = parser.parse_args()

    # 잠재 공간 설정
    args.latent = 20
    # mapping 네트워크 설정
    args.n_mlp = 8

    # 생성자 레이어 설정
    g_ema = Generator(
        args.size, args.latent, args.n_mlp, channel_multiplier=args.channel_multiplier
    ).to(device)
    # 인코더 설정
    encoder = Encoder(
        args.size, args.latent, channel_multiplier=args.channel_multiplier
    ).to(device)
    # 가중치 불러오기
    checkpoint = torch.load(args.ckpt, map_location="cuda:0")

    # 가중치 불러와서 생성자로 설정
    g_ema.load_state_dict(checkpoint["g_ema"])
    encoder.load_state_dict(checkpoint["enc"])

    # truncation 기법인거 같은데 뭔지 모르겠네
    if args.truncation < 1:
        with torch.no_grad():
            mean_latent = g_ema.mean_latent(args.truncation_mean)
    else:
        mean_latent = None

    # 이미지 생성
    generate(args, g_ema, encoder, device, mean_latent, args.test_path, args.size)
