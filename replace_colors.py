import os

files_to_process = [
    r"c:\Users\marth\Downloads\Portfolio-main\src\components\Services.jsx",
    r"c:\Users\marth\Downloads\Portfolio-main\src\components\Works.jsx",
    r"c:\Users\marth\Downloads\Portfolio-main\src\components\Project.jsx",
    r"c:\Users\marth\Downloads\Portfolio-main\src\components\About.jsx",
    r"c:\Users\marth\Downloads\Portfolio-main\src\components\footer.jsx"
]

replacements = [
    ("bg-[#f5f0e8]", "bg-transparent"),
    ("bg-[#0e0d0b]", "bg-[#f5f0e8]"),
    ("text-[#0e0d0b]", "text-[#f5f0e8]"),
    ("text-[#0e0b0d]", "text-[#f5f0e8]"),
    ("border-[#0e0d0b]", "border-[#f5f0e8]"),
    ("text-[#6b6560]", "text-[#f5f0e8]/80"),
    ("text-[#c5bdb2]", "text-[#f5f0e8]/50"),
    ("text-[#e0d9ce]", "text-[#f5f0e8]/30"),
    ("border-[#e0d9ce]", "border-[#f5f0e8]/20"),
    ("bg-[#e0d9ce]", "bg-[#f5f0e8]/20"),
    ("text-[#e8e0d0]", "text-[#f5f0e8]/10"),
    ("'#e8e0d0'", "'rgba(245, 240, 232, 0.1)'"),
    ("text-[#818356]", "text-[#f5f0e8]"),
    ("bg-[#818356]", "bg-[#f5f0e8]"),
    ("border-[#818356]", "border-[#f5f0e8]"),
    ("via-[#818356]", "via-[#f5f0e8]"),
    ("bg-black", "bg-transparent"),
    ("bg-[#111]", "bg-[#f5f0e8]/5"),
    ("border-[#222]", "border-[#f5f0e8]/10"),
    ("hover:bg-[#1a1a1a]", "hover:bg-[#f5f0e8]/10"),
    ("hover:border-[#333]", "hover:border-[#f5f0e8]/20"),
    ("border-[#333]", "border-[#f5f0e8]/20"),
    ("text-[rgb(216,214,214)]", "text-[#f5f0e8]"),
    ("text-[rgb(168,168,168)]", "text-[#f5f0e8]/80"),
    ("text-[#aaa]", "text-[#f5f0e8]/70"),
    ("text-[#888]", "text-[#f5f0e8]/60"),
    ("text-[#b9b9b2]", "text-[#f5f0e8]/50")
]

for filepath in files_to_process:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # specific fixes for footer which is ALREADY #818356 so we shouldn't change its bg
        if "footer.jsx" in filepath:
            content = content.replace('bg-[#818356]', 'bg-transparent')
        else:
            for old, new in replacements:
                content = content.replace(old, new)
                
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Processed {filepath}")
    else:
        print(f"File not found: {filepath}")
