import { ReactNode } from "react"
import './Footer.css'

interface IFooterProps {
    children: ReactNode
}

export function Footer(props: IFooterProps){
    return (
        <footer>
            <div>
                <img src="<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="50" height="50" fill="url(#pattern0_9_5047)"/>
<defs>
<pattern id="pattern0_9_5047" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_9_5047" transform="scale(0.00390625)"/>
</pattern>
<image id="image0_9_5047" width="256" height="256" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>" alt="" />
            </div>
            <div>
                <p>© 2024 TurboSphere. Все права защищены </p>
                <p>Условия использования</p>
                <p>Политику конфиденциальности</p>
            </div>
        </footer>
    )
}