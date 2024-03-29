import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container, OkButton } from './styles';
interface OrderConfirmedModalProps {
    visible: boolean;
    onOk: () => void;
}
export function OrderConfirmedModal({
    visible,
    onOk,
}: OrderConfirmedModalProps) {
    return (
        <Modal visible={visible} animationType="fade">
            <Container>
                <CheckCircle />

                <Text
                    size={20}
                    weight="600"
                    color="#fff"
                    style={{ marginTop: 12 }}
                >
                    Pedido Confirmado
                </Text>
                <Text opacity={0.9} color="#fff" style={{ marginTop: 4 }}>
                    O pedido já está em produção
                </Text>

                <OkButton onPress={onOk}>
                    <Text color="#d73035" weight="600">
                        OK
                    </Text>
                </OkButton>
            </Container>
        </Modal>
    );
}
