import { render } from 'solid-js/web';
import '@styles/index.scss';
import toast, { Toaster } from 'solid-toast';

const notify = () => toast.success('Here is your toast.');

function HelloWorld() {
	return (
		<>
			<Toaster />
			<div class="flex text-3xl font-bold underline text-center justify-center items-center h-screen">
				<button onClick={notify}>Make me a toast</button>

				<img src="image.svg" alt="test image" width="255" height="255" />
			</div>
		</>
	);
}

render(() => <HelloWorld />, document.querySelector('#app')!);
