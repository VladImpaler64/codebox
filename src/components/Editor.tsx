import { useState } from "react";

export function Editor() { 
	const [lineNumber, setLineNumber] = useState(3);
	const [lastChar, setLastChar] = useState("");
	const [remain, setRemain] = useState(0);

	/* EVENT HANDLER FUNCTIONS */

	function onSelectTextcode(e: React.TransitionEvent<HTMLTextAreaElement>){
		let target = e.target as HTMLTextAreaElement;
		setLastChar(target.value.charAt(target.selectionStart - 1))

		// Count new lines
		if (e.nativeEvent.type === "mouseup"){

			let text = target.value.slice(target.selectionStart, target.selectionEnd)
			let count = 0;
				for (const char of text){
					if (char === '\n') {
						count += 1;	
					}
				}
			setRemain(count)
		}
	}

	function onKeydownTextcode(e: React.KeyboardEvent){
		if (e.key === "Tab") {
			e.preventDefault();
			let target = e.target as HTMLTextAreaElement;
			let text = target.value;
			let start = target.selectionStart;
				let sub = text.substring(0, target.selectionStart)
				sub += "\t"
				let sub2 = text.substring(target.selectionStart, text.length)
				target.value = sub + sub2
				target.selectionStart = target.selectionEnd = start + 1;

		}
	}

	function onChangeTextcode(e: React.ChangeEvent){
		// Insertions in .preview element
		document.querySelector("#lang-hg").innerHTML = (e.target as HTMLTextAreaElement).value;

			switch (e.nativeEvent.inputType) {
				case "insertLineBreak":
					setLastChar(e.target.value.at(-1))
						setLineNumber(lineNumber + 1)
						document.querySelector(".editor-numbers").value += `${lineNumber+1}\n`;
					break;
				case "deleteContentBackward":
					if(lastChar === "\n"){	
						let result = "";
						for(let i=1; i<lineNumber; i++){
							result+=`${i}\n`;
						}
						document.querySelector(".editor-numbers").value = result;
						setLastChar(e.target.value.at(-1))
						setLineNumber(lineNumber - 1)
					} else if (remain > 0){
						let result = "";
						for(let i=0; i<lineNumber-remain; i++){
							result+=`${i+1}\n`;
						}
						document.querySelector(".editor-numbers").value = result;
						setLineNumber(lineNumber - remain)
						setRemain(0)
					} else {
						setLastChar(e.target.value.at(-1))
					}
					break;
				case "insertText": 
					setLastChar(e.target.value.at(-1))
						break;
				case "insertFromPaste": 
					let text = e.nativeEvent.data;
					let i = 1;
					for (let letter of text) {
						if (letter === '\n') {
							document.querySelector(".editor-numbers").value += `${lineNumber + i}\n`;
							i += 1;
						}
					}
					setLastChar(e.nativeEvent.data.at(-1))
						setLineNumber(i)
						break;

			}
	}

	function onScrollTextcode(e){
		document.querySelector(".editor-numbers")?.scrollBy(0, 15)
	}

	function captureTextarea() {
		const element = document.querySelector('.preview');

		element.parentNode.showModal();
		html2canvas(element).then(canvas => {
				const image = canvas.toDataURL('image/png');

				const link = document.createElement('a');
				link.download = 'codebox-madeby@vladimpaler64.png';
				link.href = image;

				link.click();
				element?.parentNode?.close();
				});
	}

	function openPreview(e){
		hljs.highlightAll();
		let preview = document.querySelector(".bot-info");
		preview.showModal();
	}

/* Up until now previous functions were to handle editor settings and functionality, now the part to interact with Telegram as a backend */

// Logic to pass info from your mini app to your bot

	function sendBackToBot(e){ 
		let textcode = document.querySelector(".textcode") as HTMLTextAreaElement;

		if(textcode.value.length !== 0) {
			// If it is not supported we skip the error
			try {
				webapp.CloudStorage.setItem("buffer_data", textcode.value, (err, stored)=>{
					console.log(err, stored)
				});
			} catch (err) {
				;
			}

			window.Telegram.WebApp.switchInlineQuery(textcode.value); // This method is used to send back any data, up to 4096 bytes to your but, this way you may have a "backend" to interact with users in the app after they used your min app
		}

	}

// We return out component
	return (
	<>
		<div className="editor" style={{display: "flex", flexFlow: "row"}}>
			
			<textarea className="editor-numbers" defaultValue={"1\n2\n3\n"} disabled datatype="number"></textarea>
			<textarea className="textcode" defaultValue={"// Welcome to CODEBOX, this is my mini app example so you can write code more properly inside Telegram, and share it once you are done.\n// Settings can be found in menu, to change language for highlight, font size and color. Also if you exit without making any action, code will be saved in cloudStorage, max size is 4096 bytes, so be aware\n// Enojoy!"} tabIndex={1} onSelect={onSelectTextcode} onKeyDown={onKeydownTextcode} onChange={onChangeTextcode} onScroll={onScrollTextcode}></textarea>
			<canvas id="myCanvas" hidden></canvas>
		</div>

		<div style={{width: "100vw", height: "10vh", display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "center", gap: "0.4rem"}}>

			<button onClick={captureTextarea}>Download png</button>
			<button onClick={sendBackToBot}>Parse html</button>
			<button onClick={openPreview}>Preview</button>
			<dialog className="bot-info">
				<div className="preview">
					<pre><code id="lang-hg" className="language-rust" ></code></pre>
				</div>
				<button onClick={(e)=>{ e.target.parentNode.close()}}>X</button>
			</dialog>
		</div>

	</>
	);
}

