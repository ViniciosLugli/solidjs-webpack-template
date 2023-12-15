import { render } from 'solid-js/web';
import '@styles/index.scss';

function HelloWorld() {
	return (
		<div class="text-3xl font-bold underline text-center">
			<p>Hello World!</p>
			<img src="image.svg" alt="test image" />
		</div>
	);
}

render(() => <HelloWorld />, document.querySelector('#app')!);
