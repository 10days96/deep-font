# from crypt import methods
from flask import Flask, jsonify, request

from PIL import Image
from pathlib import Path
import torch
from torchvision import transforms, utils
from model import Generator, Encoder

TRANSFORM = transforms.Compose(
    [transforms.ToTensor(), transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))]
)


app = Flask(__name__)


@app.route("/data", methods=["POST"])
def get_style():

    data_path = root_path / "web" / "img"
    content_img = data_path / "content"
    style_img = data_path / "style"

    if request.is_json:
        data = request.get_json()
        style = data["style"]
        comment = data["comment"]

        if style == "contrast":
            content_img = list(content_img.glob("**/*"))
            print(len(content_img))
            style_img = style_img / "contrast.png"

            style_tensor = TRANSFORM(Image.open(style_img).convert("RGB")).to(device)
            style_feat = encoder(style_tensor.unsqueeze(0))

            result = []
            for j, c in enumerate(content_img):
                content_tensor = TRANSFORM(Image.open(c).convert("RGB")).to(device)
                cnt_feats = encoder(content_tensor.unsqueeze(0))

                sample, _ = g_ema(
                    [cnt_feats[-1], style_feat[-1]],
                    inject_index=4,
                    input_is_latent=True,
                )
                result.append(sample)

            result = torch.cat(
                (result[0].squeeze(0), result[1].squeeze(0), result[0].squeeze(0)),
                dim=-1,
            )

            save_path = data_path / "result" / f"{style}.png"
            utils.save_image(
                result, save_path, normalize=True, range=(-1, 1),
            )

    print("DONE")

    return f"{style}.png"


if __name__ == "__main__":

    # 모델 초기화
    latent, n_mlp = 20, 8
    size = 128

    global root_path
    root_path = Path().absolute()
    ckpt = root_path / "web" / "checkpoint" / "140000.pt"

    torch.backends.cudnn.benchmark = True
    torch.autograd.set_grad_enabled(False)

    global g_ema, encoder

    # print(Path().absolute())

    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

    g_ema = Generator(size, latent, n_mlp, channel_multiplier=1).to(device)
    encoder = Encoder(size, latent, channel_multiplier=1).to(device)

    checkpoint = torch.load(ckpt, map_location="cuda:0")
    g_ema.load_state_dict(checkpoint["g_ema"])
    encoder.load_state_dict(checkpoint["enc"])

    app.run(debug=True)
