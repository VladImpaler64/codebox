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
		}
		reader.readAsText(f[0])
	}

// Functionality with Telegram
	const webapp = window.Telegram.WebApp;
	// const user_info = Telegram.Utils.urlParseQueryString(Telegram.WebApp.initData);

	function clickX(){
		// let username = Telegram.Utils.urlParseQueryString(user_info.user)
		webapp.showAlert(`Thanks for using my demo mini app`, ()=>{ // A Telegram build-in alert
			// All logic after closing alert can be done in this event
		})
		webapp.close(); // In this case the button is made to close the mini app

	}

	// Helper functions
	
	function saveFile(e: React.MouseEvent){
		let buffer = document.querySelector(".textcode");
		let input = (document.querySelector(".file") as HTMLInputElement).files[0];

		if (input !== undefined){
			let a = e.target;
			let file = new Blob([(buffer as HTMLTextAreaElement).value], {type: input.type});
			(a as HTMLAnchorElement).href = URL.createObjectURL(file);
			(a as HTMLAnchorElement).download = input.name;
		} else {
			let info = prompt("Name of the file") || ""
			let a = e.target;
			let file = new Blob([(buffer as HTMLTextAreaElement).value]);
			(a as HTMLAnchorElement).href = URL.createObjectURL(file);
			(a as HTMLAnchorElement).download = info;
		}
	}

	return (<>
		<nav>
			<input className="file" type="file" placeholder="File name: " autoFocus tabIndex={0} onSubmit={onSubmitInput} onChange={onChangeInput}></input>
			<div className="menulist">
				<a onClick={saveFile}>Save</a>
				<input type="checkbox" id="menu-btn"></input>
				<label className="boton-menu" htmlFor="menu-btn">Menu</label>
				<li onClick={clickX}>Exit</li>
				<Menu />
			</div>
		</nav>
	</>);
}
