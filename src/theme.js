import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	colors: {
		primary: "#1688e6",
		secondary: "#00c9df",
		highlight: "#00e1b5",
		warning: "#f9f871",
		danger: "#9360ab",
	},
	components: {
		Button: {
			baseStyle: {
				_hover: {
					boxShadow: "md",
					transform: "scale(1.02)",
					background: "highlight"
				}
			},
		},
	}
})

export default theme;