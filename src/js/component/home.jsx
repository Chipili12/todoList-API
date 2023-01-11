import React, { useState } from "react";


//create your first component
const Home = () => {

	const [Lista, setLista] = useState([]);
	const [Nuevo, setNuevo] = useState('');

	function AddItem() {
		if (Nuevo !== '') {
			setLista([...Lista, Nuevo]);
			setNuevo('');
		}
	}

	function Enter(event) {
		if (event.key === 'Enter') {
			AddItem();
		}
	}

	function removerItem(index) {
		const newLista = [...Lista];
		newLista.splice(index, 1);
		setLista(newLista);
	}
	function placeholda(Lista){
		if(Lista.length>0){
			return ""
		}
		else{
			return "No tasks, add a task"
		}
	}

	return (
		<div className="container d-flex">
			<div className="m-auto mt-5">
			<h1 className="text-center" id="header">todos</h1>
			<div className="sombra">
				<div className="d-flex">
					<input
						className="form-control border-bottom"
						type="text"
						value={Nuevo}
						onChange={e => setNuevo(e.target.value)}
						onKeyPress={Enter}
						placeholder={placeholda(Lista)}
					/>
				</div>
				<div className="d-flex">
					<ol className="ps-0 w-100 mb-0" style={{ listStyleType: 'none' }}>
						{Lista.map((item, index) => (
							<li className="border-bottom ps-2 d-flex" key={index}>
								<p className="mb-0 pt-2">{item}</p>
								<button className="btn ms-auto justify-content-end" onClick={() => removerItem(index)}>X</button>
							</li>
						))}
					</ol>
				</div>
				<p id="ileft"className="ps-2">{Lista.length} Item left</p>
				</div>
			</div>
		</div>
	)
};

export default Home;
