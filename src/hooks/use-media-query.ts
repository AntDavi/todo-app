import * as React from "react"

// Hook personalizado para verificar a correspondência de uma media query CSS
export function useMediaQuery(query: string) {
    const [value, setValue] = React.useState(false); // Estado para armazenar o resultado da media query

    React.useEffect(() => {
        function onChange(event: MediaQueryListEvent) {
            setValue(event.matches); // Atualiza o estado quando a media query muda
        }

        const result = matchMedia(query); // Avalia a media query
        result.addEventListener("change", onChange); // Adiciona um ouvinte para mudanças na media query
        setValue(result.matches); // Define o estado inicial com o resultado atual da media query

        // Remove o ouvinte quando o componente é desmontado
        return () => result.removeEventListener("change", onChange);
    }, [query]);

    return value; // Retorna o estado que indica se a media query corresponde
}
