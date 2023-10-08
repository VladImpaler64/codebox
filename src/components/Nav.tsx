import React from "react";
import { Menu } from "./Menu";

export function Nav(){

//Event handlers for this component
	function onSubmitInput(e: React.FormEvent){
		(e.target as HTMLInputElement).setAttribute("disabled", "");
	}

	function onChangeInput(e: React.ChangeEvent){
		let f =  (e.target as HTMLInputElement).files;
		let buffer = document.querySelector(".textcode");
		let reader = new FileReader();
		reader.onload = ()=>{
			(buffer as HTMLTextAreaElement).value = reader.result as string;
			// Insert number of lines when reading a file
			let i = 1, total = "";
			for (let letter of reader.result as string) {
				if (letter === '\n') {
					total += `${i}\n`;
					i += 1;
				}
			}

			(document.querySelector(".editor-numbers") as HTMLTextAreaElement).value = total;
		}
		reader.readAsText(f[0])
	}

// Functionality with Telegram
	const webapp = window.Telegram.WebApp;

	function clickX(){
		let data = (document.querySelector(".textcode") as HTMLTextAreaElement).value;
		if (data.length > 0 && data.length <= 4096){
			webapp.CloudStorage.setItem("buffer_data", data, (err, stored)=>{ // Store last input data in cloudstorage, loaded on mini app init
				console.log(err, stored)
			});
		}

		try {

			let color = (document.querySelector("#input-font_color") as HTMLInputElement).value;
			let font = (document.querySelector("#input-font_size") as HTMLInputElement).value;
			let lang = (document.querySelector("#langs") as HTMLInputElement).value;

			let data = JSON.stringify({color: color, font_size: font, lang: lang});
			webapp.CloudStorage.setItem("config", data, (err, stored)=>{ // Store config data to load on mini app init
				console.log(err, stored)
			});
		} catch (err) {
			;
		}

		webapp.showAlert(`Thanks for using my demo mini app`, ()=>{ // A Telegram build-in alert
			// All logic after closing alert can be done in this event
		})
		webapp.close(); // In this case the button is made to close the mini app

	}

	return (<>
		<nav>
			<input className="file" accept="text/*" type="file" placeholder="File name: " autoFocus tabIndex={0} onSubmit={onSubmitInput} onChange={onChangeInput}></input>
			<div className="menulist">
				<input type="checkbox" id="menu-btn"></input>
				<label className="boton-menu" htmlFor="menu-btn">Menu</label>
				<li onClick={clickX}>Exit</li>
				<Menu />
			</div>
		</nav>
	</>);
}
