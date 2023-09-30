import { useState } from "react";	

export function Menu(){
	const [config, setConfig] = useState({color: "#888888", font_size: "2", lang: "language-rust"});

//Event Handlers
	function onClickContainer(){
		(document.querySelector("#menu-btn") as HTMLInputElement).checked = false;
	}

	function onLangSelection(e: React.ChangeEvent){
		let lang = (e.target as HTMLInputElement).value
		document.querySelector("#lang-hg")?.setAttribute("class", `${lang}`)
		setConfig({color: config.color, font_size: config.font_size, lang: lang})
		Telegram.WebApp.CloudStorage.setItem("config", JSON.stringify(config))
	}

	function onFontColor(e: React.ChangeEvent){
		let color = (e.target as HTMLInputElement).value;
		setConfig({color: color, font_size: config.font_size, lang: config.lang});
		document.querySelector(".textcode")?.setAttribute("style", `color: ${color}; font-size: ${Number(config.font_size) / 2}rem;`);
		document.querySelector(".editor-numbers")?.setAttribute("style", `color: ${color}; font-size: ${Number(config.font_size) / 2}rem;`);
		Telegram.WebApp.CloudStorage.setItem("config", JSON.stringify(config))
	}

	function onFontSize(e: React.ChangeEvent){
		let fontsize = Number((e.target as HTMLInputElement).value)
		let size = fontsize > 0 && fontsize <= 5 ? fontsize : null;
		if (size){
			setConfig({color: config.color, font_size: String(fontsize), lang: config.lang});
			document.querySelector(".textcode")?.setAttribute("style", `color: ${config.color}; font-size: ${size / 2}rem`);
			document.querySelector(".editor-numbers")?.setAttribute("style", `color: ${config.color}; font-size: ${size / 2}rem`);
		}
		Telegram.WebApp.CloudStorage.setItem("config", JSON.stringify(config))
	}

	return (<>
		<div className="menu">
			<label htmlFor="input-font_color">Font Color</label>
			<input id="input-font_color" type="color" onChange={onFontColor}></input>
			<label htmlFor="input-font_size">Font Size</label>
			<input id="input-font_size" type="number" max={5} min={1} defaultValue={2} onChange={onFontSize}></input>
			<p>Programming language</p>
			<select name="languages" id="langs" onChange={onLangSelection}>
				<option value="" disabled>Select a lang</option>
				<option value="language-rust">Rust</option>
				<option value="language-javascript">Javascript</option>
				<option value="language-cpp">C/C++</option>
				<option value="language-python">Python</option>
				<option value="language-go">Go</option>
				<option value="language-java">Java</option>
				<option value="language-csharp">C# (Windows Java)</option>
				<option value="language-sql">SQL</option>

			</select>
			<div className="github">Visit my github to review the code, get inspired and make a mini app yourself!<br /><a href="https://github.com/vladimpaler64" style={{borderRadius: "1rem"}}>https://github.com/vladimpaler64</a></div>
		</div>	
		<div className="menu-container" onClick={onClickContainer}></div>
	</>);
}
