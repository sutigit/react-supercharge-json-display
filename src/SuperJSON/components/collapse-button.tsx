import ChevronDown from "../icons/chevron-down"
import ChevronUp from "../icons/chevron-up"

export default function CollapseButton(
    {
        visible,
        onClick,
        color,
        bgColor,
        isCollapsed
    }: {
        visible: boolean,
        onClick: () => void,
        color: string,
        bgColor: string,
        isCollapsed: boolean
    }): JSX.Element {

    return (
        <div
            onClick={onClick}
            style={{
                visibility: visible ? 'visible' : 'hidden',
                backgroundColor: bgColor,
            }}
            className="sjd-collapse-button">
            {isCollapsed ? <ChevronDown size={10} color={color} /> : <ChevronUp size={14} color={color} />}
        </div>
    )
}
