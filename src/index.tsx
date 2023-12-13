import { render } from 'solid-js/web';
import './style.css';

function HelloWorld() {
	return (
		<div class="text-3xl font-bold underline text-center">
			<p>Hello World!</p>
		</div>
	);
}

render(() => <HelloWorld />, document.querySelector('#app')!);
