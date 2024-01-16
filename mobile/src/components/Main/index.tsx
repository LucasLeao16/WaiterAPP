import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { CartItem } from '../../Types/CartItem';
import { Category } from '../../Types/Category';
import { Product } from '../../Types/Product';
import { api } from '../../utils/api';
import { Button } from '../Button';
import { Cart } from '../Cart';
import { Categories } from '../Categories';
import { Header } from '../Header';
import { Empty } from '../Icons/Empty';
import { Menu } from '../Menu';
import { TableModal } from '../TableModal';
import { Text } from '../Text';
import {
    CategoriesContainer,
    CenterContainer,
    Container,
    Footer,
    FooterContainer,
    MenuContainer,
} from './styles';
export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsloading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    useEffect(() => {
        Promise.all([api.get('/categories'), api.get('/products')]).then(
            ([categoriesResponse, productsReponse]) => {
                setCategories(categoriesResponse.data);
                setProducts(productsReponse.data);
                setIsloading(false);
            }
        );
    }, []);

    async function handleSelectCategory(categoryId: string) {
        const route = !categoryId
            ? '/products'
            : `/categories/${categoryId}/products`;

        setIsLoadingProducts(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        const { data } = await api.get(route);
        setProducts(data);
        setIsLoadingProducts(false);
    }

    function handleSaveTable(table: string) {
        setSelectedTable(table);
    }

    function handleResetOrder() {
        setSelectedTable('');
        setCartItems([]);
    }

    function handleAddToCart(product: Product) {
        if (!selectedTable) {
            setIsTableModalVisible(true);
        }

        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                (cartItem) => cartItem.product._id === product._id
            );

            // Verificando se o item  não existe no carrinho

            if (itemIndex < 0) {
                return prevState.concat({
                    quantity: 1,
                    product,
                });
            }
            //se o item existe
            const newCartItems = [...prevState];
            const item = newCartItems[itemIndex];
            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity + 1,
            };
            return newCartItems;
        });
    }

    function handleDecrementCartItem(product: Product) {
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                (cartItem) => cartItem.product._id === product._id
            );
            const item = prevState[itemIndex];
            const newCartItems = [...prevState];
            if (item.quantity === 1) {
                newCartItems.splice(itemIndex, 1);
                return newCartItems;
            }

            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity - 1,
            };

            return newCartItems;
        });
    }

    return (
        <>
            <Container>
                <Header
                    selectedTable={selectedTable}
                    onCancelOrder={handleResetOrder}
                />

                {isLoading && (
                    <CenterContainer>
                        <ActivityIndicator color="#d73035" size="large" />
                    </CenterContainer>
                )}

                {!isLoading && (
                    <>
                        <CategoriesContainer>
                            <Categories
                                categories={categories}
                                onSelectCategory={handleSelectCategory}
                            />
                        </CategoriesContainer>

                        {isLoadingProducts ? (
                            <CenterContainer>
                                <ActivityIndicator
                                    color="#d73035"
                                    size="large"
                                />
                            </CenterContainer>
                        ) : (
                            <>
                                {products.length > 0 ? (
                                    <MenuContainer>
                                        <Menu
                                            onAddToCart={handleAddToCart}
                                            products={products}
                                        />
                                    </MenuContainer>
                                ) : (
                                    <CenterContainer>
                                        <Empty />
                                        <Text
                                            color="#666"
                                            style={{ marginTop: 24 }}
                                        >
                                            Nenhum produto foi encontrado!
                                        </Text>
                                    </CenterContainer>
                                )}
                            </>
                        )}
                    </>
                )}
            </Container>

            <Footer>
                <FooterContainer>
                    {!selectedTable && (
                        <Button
                            onPress={() => setIsTableModalVisible(true)}
                            disabled={isLoading}
                        >
                            Novo pedido
                        </Button>
                    )}

                    {selectedTable && (
                        <Cart
                            cartItems={cartItems}
                            onAdd={handleAddToCart}
                            onDecrement={handleDecrementCartItem}
                            onConfirmOrder={handleResetOrder}
                            selectedTable={selectedTable}
                        />
                    )}
                </FooterContainer>
            </Footer>

            <TableModal
                visible={isTableModalVisible}
                onClose={() => setIsTableModalVisible(false)}
                onSave={handleSaveTable}
            />
        </>
    );
}
// Utilizando o Footer fora do Container para ele não ser "cortado no iphone" pela
// safeArea view(mas utilizando ela no container do footer para os elementos nao vazarem)
