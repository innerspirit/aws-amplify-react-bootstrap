import { ClientDevice, Hub } from 'aws-amplify';

export const A = {};
export const ActionRow = {};
export const Album = {};
export const AlbumPhoto = {};
export const AlbumText = {};
export const Button = {};
export const Center = {};
export const Col10 = {};
export const Col12 = {};
export const Col2 = {};
export const Col3 = {};
export const Col4 = {};
export const Col6 = {};
export const Col8 = {};
export const Col9 = {};
export const Container = {};
export const ErrorSection = {};
export const FormContainer = {};
export const FormRow = {};
export const FormSection = {};
export const HalfHeight = {};
export const Hidden = {};
export const Input = {};
export const Label = {};
export const Nav = {};
export const NavBar = {};
export const NavButton = {};
export const NavItem = {};
export const NavRight = {};
export const Overlay = {};
export const OverlaySelected = {};
export const Photo = {};
export const PhotoImg = {};
export const Picker = {};
export const PickerButton = {};
export const PickerInput = {};
export const PickerPicker = {};
export const Pre = {};
export const Section = {};
export const SectionBody = {};
export const SectionFooter = {};
export const SectionHeader = {};
export const SignInButton = {};
export const Space = {};
export const Text = {};

const BlankTheme = {
	a: A,
	actionRow: ActionRow,
	album: Album,
	albumPhoto: AlbumPhoto,
	albumText: AlbumText,
	button: Button,
	center: Center,
	col10: Col10,
	col12: Col12,
	col2: Col2,
	col3: Col3,
	col4: Col4,
	col6: Col6,
	col8: Col8,
	col9: Col9,
	container: Container,
	errorSection: ErrorSection,
	formContainer: FormContainer,
	formRow: FormRow,
	formSection: FormSection,
	halfHeight: HalfHeight,
	hidden: Hidden,
	input: Input,
	label: Label,
	nav: Nav,
	navBar: NavBar,
	navButton: NavButton,
	navItem: NavItem,
	navRight: NavRight,
	overlay: Overlay,
	overlaySelected: OverlaySelected,
	photo: Photo,
	photoImg: PhotoImg,
	picker: Picker,
	pickerButton: PickerButton,
	pickerInput: PickerInput,
	pickerPicker: PickerPicker,
	pre: Pre,
	section: Section,
	sectionBody: SectionBody,
	sectionFooter: SectionFooter,
	sectionHeader: SectionHeader,
	signInButton: SignInButton,
	space: Space,
	text: Text
};

class MediaQuery {
	query () {
		const dim = ClientDevice.dimension();
		const { width, height } = dim;

		if (width < 576) {
			BlankTheme.albumPhoto = Object.assign({}, AlbumPhoto, Col6);
			BlankTheme.photo = Object.assign({}, Photo, Col12);
			BlankTheme.albumText = Object.assign({}, AlbumText, Col12);
		} else if (width < 768) {
			BlankTheme.albumPhoto = Object.assign({}, AlbumPhoto, Col4);
			BlankTheme.photo = Object.assign({}, Photo, Col6);
			BlankTheme.albumText = Object.assign({}, AlbumText, Col8);
		} else if (width < 992) {
			BlankTheme.albumPhoto = Object.assign({}, AlbumPhoto, Col3);
			BlankTheme.photo = Object.assign({}, Photo, Col6);
			BlankTheme.albumText = Object.assign({}, AlbumText, Col6);
		} else {
			BlankTheme.albumPhoto = Object.assign({}, AlbumPhoto, Col2);
			BlankTheme.photo = Object.assign({}, Photo, Col4);
			BlankTheme.albumText = Object.assign({}, AlbumText, Col4);
		}

		BlankTheme.halfHeight = Object.assign({}, HalfHeight, { height: height / 2 });
		BlankTheme.text = Object.assign({}, BlankTheme.text, { maxHeight: height / 2 });
		BlankTheme.albumText = Object.assign({}, BlankTheme.albumText, { maxHeight: height / 3 });
	}

	onHubCapsule () {
		this.query();
	}
}

const mediaQuery = new MediaQuery();

mediaQuery.query();
Hub.listen('window', mediaQuery, 'BlankTheme');

export default BlankTheme;
