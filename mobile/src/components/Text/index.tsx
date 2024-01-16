/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextStyled } from './styles';
interface TextProps {
    weight?: '400' | '600' | '700';
    color?: string;
    size?: number;
    opacity?: number;
    children?: any;
    style?: any;
}

export function Text({
    weight,
    color,
    size,
    opacity,
    children,
    style,
}: TextProps) {
    return (
        <TextStyled
            weight={weight}
            color={color}
            size={size}
            opacity={opacity}
            style={style}
        >
            {children}
        </TextStyled>
    );
}
