import Key from "./components/Key";
import Header from "./components/Header";
import "./index.css";
import { useState } from "react";
import passages from "./passages.json" 

function longestCommonPrefix(str1, str2) {
	let prefix = "";
	let minLength = Math.min(str1.length, str2.length);

	for (let i = 0; i < minLength; i++) {
		if (str1[i] !== str2[i]) {
			break;
		}
		prefix += str1[i];
	}

	return prefix;
}

function average(list) {
  const total = list.reduce((acc, c) => acc + c, 0);
  return total / list.length;
}

function App() {
	
	let passageIndex = 0;
	let passage = passages.text[passageIndex];
  
	const [words, setWords] = useState(
		passage.split(" ").map((word, index) => {
			if (index !== passage.split(" ").length - 1) {
				word += " ";
			}
			return word;
		})
	);
	const [currentWord, setCurrentWord] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentCharacter, setCurrentCharacter] = useState(
		words[currentWord][currentIndex]
	);
	const [currentInput, setCurrentInput] = useState("");
	const [startTime, setStartTime] = useState(0);
	const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [wpmList, setWPMlist] = useState([]);
  
	function handleTyped(e) {
		if (startTime === 0) {
			setStartTime(Date.now());
		}
		setCurrentInput(e.target.value);
		if (e.target.value.length < currentIndex) {
			let tempIndex = longestCommonPrefix(
				e.target.value,
				words[currentWord]
			).length;
			setCurrentIndex(tempIndex);
			setCurrentCharacter(words[currentWord][tempIndex]);
		}

		if (
			e.target.value[e.target.value.length - 1] === currentCharacter &&
			e.target.value === words[currentWord].slice(0, e.target.value.length)
		) {
			if (currentIndex < words[currentWord].length - 1) {
				let tempIndex = currentIndex + 1;
        let tempWords = words;
        
				setCurrentIndex(tempIndex);
				setCurrentCharacter(tempWords[currentWord][tempIndex]);
			} else {
				if (currentWord < words.length - 1) {
					let tempIndex = 0;
					let tempWord = currentWord + 1;
          let tempWords = words;
					setCurrentWord(tempWord);
					setCurrentIndex(tempIndex);
					setCurrentCharacter(tempWords[tempWord][tempIndex]);
					e.target.value = "";
					setCurrentInput("");
				} else {
					//Passage ends
					let tempIndex = 0;
					let tempWord = 0;
					let tempPassage;
          let tempWords = words;

          tempPassage = Math.floor(Math.random() * passages.text.length);

					passageIndex = tempPassage;
          passage = passages.text[tempPassage];
          
					setCurrentWord(tempWord);
					setCurrentIndex(tempIndex);
					setWords(
						passage.split(" ").map((word, index) => {
							if (index !== passage.split(" ").length - 1) {
								word += " ";
							}
							return word;
						})
					);
					setCurrentCharacter(tempWords[tempWord][tempIndex]);
					e.target.value = "";
					setCurrentInput("");
					let tempTime = Date.now();

          let tempWPM = Math.floor((words.length / ((tempTime - startTime) / 1000)) * 60);
					setWordsPerMinute(
						tempWPM
					);
          
          setWPMlist([...wpmList, tempWPM])
					setStartTime(0);
				}
			}
		}
	}

	return (
		<div className="flex flex-col w-screen h-screen gap-4 bg-slate-900">
			<Header></Header>
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="absolute left-4 top-28 flex flex-col items-center w-[15rem] gap-4 p-4 text-white border-4 border-yellow-400 rounded bg-slate-800">
          <div className="flex flex-col items-center">
            <p className="text-[3rem]">{wordsPerMinute}</p>
            <p>Current WPM</p>
          </div>
          <div className="flex justify-between w-full gap-4">
            <div className="flex flex-col items-center">
              <p className="text-[2rem]">{isNaN(average(wpmList)) ? 0 : average(wpmList).toFixed(0)}</p>
              <p>Avg WPM</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[2rem]">{Math.max(...wpmList) < 0 ? 0 : Math.max(...wpmList)}</p>
              <p>Best WPM</p>
            </div>
          </div>
        </div>
				<h2 className="flex flex-wrap w-[50rem] gap-[6px] text-white text-xl self-center justify-center">
					{words.map((word, index) => {
						let tempWord = word;
						let wrong = false;
						let currentCorrect = "";
						if (index === currentWord) {
							let longestCorrect = longestCommonPrefix(
								currentInput,
								word
							).length;
							currentCorrect = tempWord.slice(0, currentIndex);
							if (
								currentInput.length > longestCorrect &&
								currentInput.length !== 0
							) {
								wrong = true;
							}
							tempWord = tempWord.slice(currentIndex);
						}
						return (
							<p
								key={index}
								className={
									index < currentWord ? "text-yellow-400 " : "text-white "
								}
							>
								<span className="text-yellow-400 no-underline">
									{currentCorrect}
								</span>
								<span
									className={
										(index === currentWord ? "underline " : "no-underline ") +
										(wrong ? "text-red-500 " : "")
									}
								>
									{tempWord}
								</span>
							</p>
						);
					})}
				</h2>
				<input
					className="self-center px-1 mb-8 text-white border-none bg-slate-800"
					onChange={handleTyped}
				></input>
				<div className="flex flex-col items-center gap-4 p-4">
					<div className="flex gap-4">
						<Key character="Q" current={currentCharacter}></Key>
						<Key character="W" current={currentCharacter}></Key>
						<Key character="E" current={currentCharacter}></Key>
						<Key character="R" current={currentCharacter}></Key>
						<Key character="T" current={currentCharacter}></Key>
						<Key character="Y" current={currentCharacter}></Key>
						<Key character="U" current={currentCharacter}></Key>
						<Key character="I" current={currentCharacter}></Key>
						<Key character="O" current={currentCharacter}></Key>
						<Key character="P" current={currentCharacter}></Key>
					</div>
					<div className="flex gap-4">
						<Key character="A" current={currentCharacter}></Key>
						<Key character="S" current={currentCharacter}></Key>
						<Key character="D" current={currentCharacter}></Key>
						<Key character="F" current={currentCharacter}></Key>
						<Key character="G" current={currentCharacter}></Key>
						<Key character="H" current={currentCharacter}></Key>
						<Key character="J" current={currentCharacter}></Key>
						<Key character="K" current={currentCharacter}></Key>
						<Key character="L" current={currentCharacter}></Key>
						<Key character=";" current={currentCharacter}></Key>
						<Key character={"'"} current={currentCharacter}></Key>
					</div>
					<div className="flex gap-4">
						<Key character="Z" current={currentCharacter}></Key>
						<Key character="X" current={currentCharacter}></Key>
						<Key character="C" current={currentCharacter}></Key>
						<Key character="V" current={currentCharacter}></Key>
						<Key character="B" current={currentCharacter}></Key>
						<Key character="N" current={currentCharacter}></Key>
						<Key character="M" current={currentCharacter}></Key>
						<Key character="," current={currentCharacter}></Key>
						<Key character="." current={currentCharacter}></Key>
						<Key character="/" current={currentCharacter}></Key>
					</div>
					<Key character=" " current={currentCharacter}></Key>
				</div>
			</div>
		</div>
	);
}

export default App;
