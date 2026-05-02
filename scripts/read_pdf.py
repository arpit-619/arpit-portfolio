import sys
try:
    import pypdf
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    import pypdf

def read_pdf(file_path):
    with open(file_path, "rb") as f:
        reader = pypdf.PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        with open("resume_text_utf8.txt", "w", encoding="utf-8") as out_f:
            out_f.write(text)

if __name__ == "__main__":
    read_pdf(r"C:\Users\arpit\OneDrive\Resume\Resume Website\Resume\Arpit_Alne_9284825897_RPA Developer_01052026.pdf")
