import hljs from "highlight.js";
import Html2Image from "node-html-to-image";

export async function makePNG(ctx, code, width, bot = null, article_id = 0){
  
  const highlightedCode = hljs.highlightAuto(code).value;

  const html = `
<html>
<head>
<style>
html {
  margin: 0;
  padding: 0.5rem;
  box-sizing: border-box;
  display: contents;
  width: ${width * 16 + 64}px;
  height: 0;
  background-color: #282c34;
}

.hljs {
  display: block !important;
  font-size: 1rem;
  padding: .5em !important;
  color: #abb2bf !important;
  background: #282c34 !important;
}

.hljs-comment,
.hljs-quote {
	color: #5c6370 !important;
	font-style: italic !important;
}

.hljs-doctag,
.hljs-formula,
.hljs-keyword {
	color: #c678dd !important;
}

.hljs-deletion,
.hljs-name,
.hljs-section,
.hljs-selector-tag,
.hljs-subst {
	color: #e06c75 !important;
}

.hljs-literal {
	color: #56b6c2 !important;
}

.hljs-addition,
.hljs-attribute,
.hljs-meta-string,
.hljs-regexp,
.hljs-string {
	color: #98c379 !important;
}

.hljs-built_in,
.hljs-class .hljs-title {
	color: #e6c07b !important;
}

.hljs-attr,
.hljs-number,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-selector-pseudo,
.hljs-template-variable,
.hljs-type,
.hljs-variable {
	color: #d19a66 !important;
}

.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-symbol,
.hljs-title {
	color: #61aeee !important;
}

.hljs-emphasis {
	font-style: italic !important;
}

.hljs-strong {
	font-weight: 700 !important;
}

.hljs-link {
	text-decoration: underline !important;
}

#lang-hg {
  tab-size: 4ch;
  overflow-wrap: break-word;
}

#lang-hg span {
  white-space: break-spaces;
}

#lang-hg span.hljs-comment {
  display: inline-block;
  max-width: 90vw;
  white-space: normal;
}

</style>
</head>
<body>
<pre><code id="lang-hg" class="hljs">${highlightedCode}</code></pre>
</body>
</html>
`;

  await Html2Image({
    type: 'png',
    html: html
  })
    .then(async (img) => {
      // Image is generated and sent to TG
      if (bot){
        const photo_id = await bot.sendPhoto(ctx.update.inline_query.from.id, { source: img }, {caption: code.length > 1000 ? "Thansk for using code box!" : `<pre><code>${code}</code></pre>`, parse_mode: "HTML"});

        await ctx.answerInlineQuery([{type: "photo", id: article_id, photo_file_id: photo_id.photo[1].file_id, caption: code.length > 1000 ? "Thansk for using code box!" : `<pre><code>${code}</code></pre>`, parse_mode: "HTML"}]);
        return;
      } else {
        await ctx.sendPhoto({ source: img }, {caption: code.length >= 1000 ? "Thansk for using CODEBOX!" : `<pre><code>${code}</code></pre>`, parse_mode: "HTML"});
      }
    })
    .catch(error => console.error('An error occurred:', error));
}

export function size(text){
    let maxCols = 0; let count = 0;
    for (const char of text){
      if (char === '\n'){
        maxCols = maxCols > count ? maxCols : count;
        count = 0;
        break;
      } 
      count += 1;
    }


    return maxCols === 0 ? text.length : maxCols;
}
