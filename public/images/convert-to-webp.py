import os
from PIL import Image


def convert_image_to_webp(input_path, quality=90):
    """
    指定した画像をWebP形式で出力します。

    :param input_path: 変換する画像のファイルパス
    :param quality: 出力画像の品質（0から100までの値）
    """
    output_path = input_path.replace(".jpg", ".webp")
    image = Image.open(input_path)
    image.save(output_path, "WEBP", quality=quality)


for root, dirs, files in os.walk(os.path.dirname(os.path.abspath(__file__))):
    for file in files:
        if file.endswith(".jpg"):
            full_path = os.path.join(root, file)
            print(f"Converting {full_path}...")
            convert_image_to_webp(full_path)
