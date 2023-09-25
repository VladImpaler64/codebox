import { useState } from "react";
import { Menu } from "./Menu";
import { Telegram } from "telegraf";

export function Nav(){
	function onSubmitInput(e){
		console.log("click")
		e.target.setAttribute("disabled", "");
	}

	function onChangeInput(e){
		let f = e.target.files
		let buffer = document.querySelector(".textcode");
		console.log(f)
		let reader = new FileReader();
		reader.onload = (e)=>{
			buffer.value = reader.result;
		}
		reader.readAsText(f[0])
	}

// Functionality with Telegram
	const Telegram = window.Telegram.WebApp;
	function clickX(e){
		console.log(Telegram)
		Telegram.showAlert("This is a test", ()=>{
			// All logic before closing web app can be done in this event
		})

	}

	// Helper functions
	
	function saveFile(e){
		let buffer = document.querySelector(".textcode");
		let input = document.querySelector(".file").files[0];

		if (input !== undefined){
			let a = e.target;
			let file = new Blob([buffer.value], {type: input.type});
			a.href = URL.createObjectURL(file);
			a.download = input.name;
		} else {
			let info = prompt("Name of the file")
			let a = e.target;
			let file = new Blob([buffer.value]);
			a.href = URL.createObjectURL(file);
			a.download = info;
		}
	}

	return (<>
		<nav>
			<input className="file" type="file" placeholder="File name: " autoFocus tabIndex={0} onSubmit={onSubmitInput} onChange={onChangeInput}></input>
			<div>
				<a onClick={saveFile}>Save</a>
				<input type="checkbox" id="menu-btn"></input>
				<label className="boton-menu" htmlFor="menu-btn">Menu</label>
				<li onClick={clickX}>Exit</li>
				<Menu />
			</div>
		</nav>
	</>);
}
