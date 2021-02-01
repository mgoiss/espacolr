import React from "react"
import ContentLoader from "react-content-loader"
import { genereteList } from "core/utils/list";

const ScheduleCardLoader = () => {

    const loaderItens = genereteList(8);

    return (
        <>
            {loaderItens.map(item => (
                <ContentLoader
                    key={item}
                    speed={2}
                    width={200}
                    height={100}
                    viewBox="0 0 200 100"
                    backgroundColor="#ecebeb"
                    foregroundColor="#D6D2D2"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="200" height="100" />
                    <rect x="119" y="158" rx="0" ry="0" width="1" height="0" />
                </ContentLoader>
            ))}
        </>
    )
}

export default ScheduleCardLoader