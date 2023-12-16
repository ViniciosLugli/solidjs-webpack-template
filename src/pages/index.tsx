import '@styles/index.scss';
import toast, { Toaster } from 'solid-toast';
import ExampleImage from '@components/image';
const notify = () => toast.success('Here is your toast.');

const Index = () => {
	return (
		<>
			<Toaster />
			<div class="flex text-3xl font-bold underline text-center justify-center items-center h-screen">
				<button onClick={notify}>Make me a toast</button>
				<ExampleImage />
			</div>
		</>
	);
};

export default Index;
