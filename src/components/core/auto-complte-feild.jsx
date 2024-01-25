import { usePlacesWidget } from "react-google-autocomplete";
const gapi = import.meta.env.VITE_APP_GOOGLE_API_KEY;
export function CustomAutoComplete ({value,onChange}) {
    const { ref } = usePlacesWidget({
        apiKey: gapi,
        onPlaceSelected: (place) => {
            console.log(place);
        },
        options: {
            types: ["(regions)"],
        },
    });
    return <input ref={ref} style={{borderColor:'#EAEEF6' , fontSize:'14px'}} defaultValue={value} onChange={(e) => onChange(e.target.value)}/>;
}
