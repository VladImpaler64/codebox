import { useState } from "react";

export function Editor() { 
	const [lineNumber, setLineNumber] = useState(1);
	const [lastChar, setLastChar] = useState("");

	/* EVENT HANDLER FUNCTIONS */

	function onSelectTextcode(e){
		setLastChar(e.target.value.at(e.target.selectionStart - 1))
	}

	function onKeydownTextcode(e){
		if (e.key === "Tab") {
			e.preventDefault();
			let text = e.target.value;
			let start = e.target.selectionStart
				let sub = text.substring(0, e.target.selectionStart)
				sub += "\t"
				let sub2 = text.substring(e.target.selectionStart, text.length)
				e.target.value = sub + sub2
				e.target.selectionStart = e.target.selectionEnd = start + 1;

		}
	}

	function onChangeTextcode(e){
		document.querySelector(".language-rust").innerHTML = e.target.value 
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
		let code = document.querySelector(".preview");
		let textcode = document.querySelector(".textcode");

		if(textcode.value.length !== 0) window.Telegram.WebApp.sendData(code?.innerHTML); // This method is used to send back any data, up to 4034 bytes to your but, this way you may have a "backend" to interact with users in the app after they used your min app

	}


// We return out component
	return (
	<>
		<div className="editor" style={{display: "flex", flexFlow: "row"}}>
			
			<textarea className="editor-numbers" disabled datatype="number">1&#10;</textarea>
			<textarea className="textcode" tabIndex={1} onSelect={onSelectTextcode} onKeyDown={onKeydownTextcode} onChange={onChangeTextcode} onScroll={onScrollTextcode}></textarea>
			<canvas id="myCanvas" hidden></canvas>
		</div>

		<div style={{width: "100vw", height: "10vh", display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "center", gap: "0.4rem"}}>

			<button onClick={captureTextarea}>Download png</button>
			<button onClick={sendBackToBot}>Parse html</button>
			<button onClick={openPreview}>Preview</button>
			<dialog className="bot-info">
				<div className="preview">
					<pre><code className="language-rust" ></code></pre>
				</div>
				<button onClick={(e)=>{ e.target.parentNode.close()}}>X</button>
			</dialog>
		</div>

	</>
	);
}

