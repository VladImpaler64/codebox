import { useState } from "react";	
import { Donation } from "./Donation.tsx"

export function Menu(){
//Event Handlers
	function onClickContainer(e){
		document.querySelector("#menu-btn").checked = false;
	}

	function onLangSelection(e){
		let lang = e.target.value
		document.querySelector("#lang-hg")?.setAttribute("class", `${lang}`)
	}

	function onFontColor(e){
		let color = e.target.value;
		document.querySelector(".textcode")?.setAttribute("style", `color: ${color}`);
	}

	function onFontSize(e){
		let size = e.target.value > 0 ? e.target.value : null;
		if (size){
			document.querySelector(".textcode")?.setAttribute("style", `font-size: ${size / 2}rem`);
			document.querySelector(".editor-numbers")?.setAttribute("style", `font-size: ${size / 2}rem`);
		}
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
				<option value="language-c++">C/C++</option>
				<option value="language-python">Python</option>
				<option value="language-go">Go</option>
				<option value="language-java">Java</option>
				<option value="language-csharp">C# (Windows Java)</option>
				<option value="language-html">Html</option>
				<option value="language-sql">SQL</option>

			</select>
			<Donation />
		</div>	
		<div className="menu-container" onClick={onClickContainer}></div>
	</>);
}
