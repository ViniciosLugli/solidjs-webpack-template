import '@styles/index.scss';
import toast, { Toaster } from 'solid-toast';
import ExampleImage from '@components/image';
import { Tooltip } from '@ark-ui/solid';
import { Portal } from 'solid-js/web';

const notify = () => toast.success('Here is your toast.');

const Index = () => {
	return (
		<>
			<Toaster />
			<div class="flex text-3xl text-center justify-center items-center h-screen">
				<Tooltip.Root openDelay={250} closeDelay={250}>
					<Tooltip.Trigger>
						<button class="font-bold underline" onClick={notify}>
							Make me a toast
						</button>
					</Tooltip.Trigger>
					<Portal>
						<Tooltip.Positioner>
							<Tooltip.Content>Congrats, you made a toast!</Tooltip.Content>
						</Tooltip.Positioner>
					</Portal>
				</Tooltip.Root>
				<ExampleImage />
			</div>
		</>
	);
};

export default Index;
