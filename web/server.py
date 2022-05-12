# from crypt import methods
from pathlib import Path
from datetime import datetime

from flask import Flask, jsonify, request, render_template
from PIL import Image
import torch
from torchvision import transforms, utils

import numpy as np

from model import Generator, Encoder


TRANSFORM = transforms.Compose(
    [transforms.ToTensor(), transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))]
)


app = Flask(__name__, static_url_path="/static")


@app.route("/img", methods=["POST"])
def get_style():

    data_path = root_path / "web" / "img"
    content_img = data_path / "content"
    style_cache = root_path / "web" / "cache" / "style.npy"

    style_np = np.load(style_cache)

    if request.is_json:

        s = datetime.now().strftime("%Y-%m-%d%H%M%S")
        data = request.get_json()
        style = data["style"]
        text = data["text"]
        text = list(text)

        # contrast
        if style == "1":
            style_feat = torch.from_numpy(style_np)[0].to(device)
            style_feat = style_feat.unsqueeze(dim=0)

            result = []
            for c in text:
                content_path = content_img / f"{c}.png"
                content_tensor = TRANSFORM(Image.open(content_path).convert("RGB")).to(
                    device
                )
                cnt_feats = encoder(content_tensor.unsqueeze(0))

                sample, _ = g_ema(
                    [cnt_feats[-1], style_feat], inject_index=4, input_is_latent=True,
                )
                result.append(sample.squeeze(0))

            # print(len(result))

            result = torch.cat(result, dim=-1)

            s = datetime.now().strftime("%Y-%m-%d%H%M%S")

            save_path = root_path / "web" / "static" / f"{s}.png"
            utils.save_image(
                result, save_path, normalize=True, range=(-1, 1),
            )

    if style == "2":
        style_feat = torch.from_numpy(style_np)[1].to(device)
        style_feat = style_feat.unsqueeze(dim=0)

        result = []
        for c in text:
            content_path = content_img / f"{c}.png"
            content_tensor = TRANSFORM(Image.open(content_path).convert("RGB")).to(
                device
            )
            cnt_feats = encoder(content_tensor.unsqueeze(0))

            sample, _ = g_ema(
                [cnt_feats[-1], style_feat], inject_index=4, input_is_latent=True,
            )
            result.append(sample.squeeze(0))

        # print(len(result))

        result = torch.cat(result, dim=-1)

        save_path = root_path / "web" / "static" / f"{s}.png"
        utils.save_image(
            result, save_path, normalize=True, range=(-1, 1),
        )

    if style == "3":
        style_feat = torch.from_numpy(style_np)[2].to(device)
        style_feat = style_feat.unsqueeze(dim=0)

        result = []
        for c in text:
            content_path = content_img / f"{c}.png"
            content_tensor = TRANSFORM(Image.open(content_path).convert("RGB")).to(
                device
            )
            cnt_feats = encoder(content_tensor.unsqueeze(0))

            sample, _ = g_ema(
                [cnt_feats[-1], style_feat], inject_index=4, input_is_latent=True,
            )
            result.append(sample.squeeze(0))

        result = torch.cat(result, dim=-1)

        save_path = root_path / "web" / "static" / f"{s}.png"
        utils.save_image(
            result, save_path, normalize=True, range=(-1, 1),
        )

    print("이미지 생성 완료")
    torch.cuda.empty_cache()

    return f"{s}.png"


@app.route("/")
def main():
    return render_template("index.html")


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
