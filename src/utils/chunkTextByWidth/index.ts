export const chunkTextByWidth = (text: string, fontSize: number, width: number, maxLines: number) => {
  const lines = [];
  
  let startIndex = 0;
  let currentWidth = 0;
  
  for (let i = 0; i < text.length; i++) {
    const currentStartIndex = startIndex;
    
    const charCode = text.charCodeAt(i);
    if (charCode !== 10) {
      // Not Korean (가-힣)
      const isHalfSizeLetter = !(44032 <= charCode && charCode <= 55203);
      currentWidth += isHalfSizeLetter ? fontSize / 2 : fontSize;
      
      if (currentWidth < width) {
        continue;
      }
      
      // Eat space
      for (; i < text.length; i++) {
        const nextCharCode = text.charCodeAt(i);
        if (nextCharCode !== 32 && nextCharCode !== 160 && nextCharCode !== 46 && nextCharCode !== 44) {
          // space, NBSP, dot, comma
          break;
        }
      }
      
      startIndex = i;
    } else {
      // Line Feed
      startIndex = i + 1;
    }
    
    lines.push(text.slice(currentStartIndex, i));
    currentWidth = 0;
    
    if (lines.length >= maxLines) {
      break;
    }
  }
  
  if (lines.length < maxLines) {
    lines.push(text.slice(startIndex));
  }
  
  return lines;
};
