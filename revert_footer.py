import os

filepath = r"c:\Users\marth\Downloads\Portfolio-main\src\components\Footer.jsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# First, handle the primary background
content = content.replace('bg-[#818356]', 'bg-[#f5f0e8]')

# Change texture lines
content = content.replace('bg-[#6b6d46]', 'bg-[#e0d9ce]')

# Change primary text to dark
content = content.replace('text-[#f5f0e8]', 'text-[#0e0d0b]')
content = content.replace('text-[#f5f0e8]/60', 'text-[#6b6560]')
content = content.replace('text-[#f5f0e8]/50', 'text-[#6b6560]')
content = content.replace('text-[#f5f0e8]/70', 'text-[#0e0d0b]/70')
content = content.replace('text-[#f5f0e8]/40', 'text-[#6b6560]/80')

# Change borders and accents
content = content.replace('border-[#f5f0e8]', 'border-[#0e0d0b]')
content = content.replace('bg-[#f5f0e8]/40', 'bg-[#0e0d0b]/40')
content = content.replace('bg-[#f5f0e8]/20', 'bg-[#0e0d0b]/20')
content = content.replace('bg-[#f5f0e8]/10', 'bg-[#0e0d0b]/10')

# The hover effect in the email button uses bg-[#f5f0e8] which was white, now it should be black
content = content.replace('bg-[#f5f0e8]', 'bg-[#0e0d0b]') 
# But wait, this would override the first line where we set bg-[#f5f0e8] for the main background!
# Let's fix that specific instance manually if it broke.
