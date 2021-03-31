import { genereteList } from "core/utils/list";
import React from "react"
import ContentLoader from "react-content-loader"

const CardListLoader = () => {
    const loaderItens = genereteList(3);
    return (
        <>
            {loaderItens.map(item => (
                <ContentLoader
                    key={item}
                    speed={2}
                    width={1300}
                    height={84}
                    viewBox="0 0 1300 84"
                    backgroundColor="#ecebeb"
                    foregroundColor="#D6D2D2"
                >
                    <rect x="0" y="0" rx="3" ry="3" width="1300" height="60" />
                </ContentLoader>
            ))}
        </>
    );
}

export default CardListLoader;