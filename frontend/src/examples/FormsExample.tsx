import { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ContentContainerContext } from '../components/ContentContainer';
import Input from '../components/Input';
import Select from '../components/Select';
import Textarea from '../components/Textarea';

const FormsExample = (props: any) => {
	const pageContext = useContext(ContentContainerContext);
	const { url } = useRouteMatch();
	useEffect(() => {
		pageContext.setLocationList([{ title: "Forms", url: url }]);
	}, []);
	return (
		<form className="w-1/2 border p-5">
			<Input onChange={(event: React.ChangeEvent) => console.log(event)} label="Label" />
			<Select label="Label" />
			<Textarea label="Textarea"></Textarea>
		</form>
	);
}
export default FormsExample;
