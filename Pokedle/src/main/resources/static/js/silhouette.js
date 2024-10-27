function changeColor(cell) {
			const currentColor = cell.style.backgroundColor;
			console.log(currentColor);
			if (currentColor === 'yellow') {
				cell.style.backgroundColor = 'green';
			} else if (currentColor === 'green') {
				cell.style.backgroundColor = "#31adff";
			} else {
				cell.style.backgroundColor = 'yellow';
			}
		}