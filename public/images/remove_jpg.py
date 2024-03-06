import os

for root, dirs, files in os.walk(os.path.dirname(os.path.abspath(__file__))):
    for file in files:
        if file.endswith(".jpg"):
            full_path = os.path.join(root, file)
            print(f"Remove {full_path}")
            os.remove(full_path)
