import { useState } from "react";	

export function Menu(){
	function onClickContainer(e){
		document.querySelector("#menu-btn").checked = false;
	}

	return (<>
		<div className="menu"></div>	
		<div className="menu-container" onClick={onClickContainer}></div>
	</>);
}
