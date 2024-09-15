import ChevronDown from "../icons/chevron-down"
import ChevronRight from "../icons/chevron-right"
import Dots3Horizontal from "../icons/dots-3-horizontal"

export default function CollapseButton(
    {
        visible,
        onClick,
        color,
        collapsedColor,
        bgColor,
        collapsedBgColor,
        isCollapsed
    }: {
        visible: boolean,
        onClick: () => void,
        color: string,
        collapsedColor: string,
        bgColor: string,
        collapsedBgColor: string,
        isCollapsed: boolean
    }): JSX.Element {

    return (
        visible ? (
            isCollapsed ?
                <div
                    onClick={onClick}
                    style={{ display: "flex", alignItems: 'center', gap: 8, cursor: 'pointer'}}>
                    <div
                        style={{ backgroundColor: collapsedBgColor }}
                        className="sjd-collapse-button">
                        <ChevronRight size={10} color={collapsedColor} />
                    </div>
                    <Dots3Horizontal size={16} color={color} />
                </div>

                :
                <div
                    onClick={onClick}
                    style={{ backgroundColor: bgColor }}
                    className="sjd-collapse-button">
                    <ChevronDown size={10} color={color} />
                </div>
        ) : <></>
    )
}
