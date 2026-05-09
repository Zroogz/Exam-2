const decodeHtml = encodedString => {
	const textArea = document.createElement('textarea')
	textArea.innerHTML = encodedString
	return textArea.value
}

const shuffle = array => {
	let currentIndex = array.length
	while (currentIndex !== 0) {
		const index = Math.floor(Math.random() * currentIndex)
		currentIndex--
		[ array[currentIndex], array[index] ] = [ array[index], array[currentIndex] ]
	}
	return array
}

export { decodeHtml, shuffle }