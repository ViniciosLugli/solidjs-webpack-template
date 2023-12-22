import { render } from 'solid-js/web';
import Index from '@pages/index';
import { MetaProvider, Title, Link, Meta } from '@solidjs/meta';

render(
	() => (
		<MetaProvider>
			<div class="Home">
				<Title>Title of page</Title>
				<Link rel="canonical" href="http://solidjs.com/" />
				<Meta name="example" content="whatever" />
				<Index />
			</div>
		</MetaProvider>
	),
	document.querySelector('#app')!
);
