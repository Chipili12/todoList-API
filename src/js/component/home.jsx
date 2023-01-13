import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {

	const [Lista, setLista] = useState([]);
	const [Nuevo, setNuevo] = useState('');

	function AddItem() { //Añade item a la lista
			fetch('https://assets.breatheco.de/apis/fake/todos/user/cositoxd', {
				method: "PUT",
				body: JSON.stringify([...Lista, Nuevo].map(item => ({ label: item, done: false }))),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					APIList()
					console.log(resp.ok);
					console.log(resp.status);
					console.log(resp.text());
					return resp.json();
				})
				.then(data => {
					console.log(data);
					setLista([...Lista, Nuevo]);
					setNuevo('');
				})
				.catch(error => {
					console.log(error);
				});
		setNuevo('')
	}
	function APIList() { //Renderiza/actualiza lista 
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/cositoxd`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (resp.ok) {
					return resp.json();
				}
			})
			.then(data => {
				setLista(data.map(item => item.label));
			})
			.catch(error => {
				console.error(error);
			});
	}
	useEffect(() => {
		APIList(); // Renderiza la lista en inicio
		crearUsuario();
	}, []);

	function Enter(event) {
		if (event.key === 'Enter') {
			AddItem();
		}
	}

	function removerItem(index) {
		const newList = [...Lista];
		newList.splice(index, 1);
		setLista(newList);
		fetch('https://assets.breatheco.de/apis/fake/todos/user/cositoxd', {
			method: "PUT",
			body: JSON.stringify(newList.map(item => ({ label: item, done: false }))),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.catch(error => {
				console.log(error);
			});
	}
	function placeholda(Lista) {
		if (Lista.length > 0) {
			return ""
		}
		else {
			return "No tasks, add a task"
		}
	}
		function crearUsuario() {
			fetch('https://assets.breatheco.de/apis/fake/todos/user/cositoxd', {
			method: 'POST', 
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify([])
			})
			.then((response) => response.json())
			.then((data) => console.log(data))
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
					<p id="ileft" className="ps-2">{Lista.length} Item left</p>
				</div>
			</div>
		</div>
	)
};

export default Home;