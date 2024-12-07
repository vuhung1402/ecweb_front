import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import ProductContainer from "./ProductContainer"
import { ProductSidebarWrapper, ProductListWrapper } from "./Product"
import ProductSidebar from "@widgets/ProductSidebar"
import ProductList from "@widgets/ProductList/ProductList"

import { useGetCategories, useGetProducts } from "./function"

const Products = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    const { isLoading: isLoadingCategpories, data: dataCategories } = useGetCategories(params);
    const { isLoading: isLoadingProducts, data: dataProducts } = useGetProducts(location, params);

    const onClick = ({item, key, keyPath}) => {
        console.log({item});
        navigate(
            {
                pathname: `/products/${item?.props?.route}`,
            },
            {
                state: {
                    key: key
                }
            }
        )
    }

    const handleSelect = (_, option) => {
        navigate(
            {
                pathname: `${location?.pathname}`,
                search: `?sort_by=${option?.name}`,
            },
            {
                state: {
                    key: location?.state?.key,
                    value: option?.value
                }
            }
        )
    };

    return (
        <ProductContainer >
            <ProductSidebarWrapper>
                <ProductSidebar
                    category={dataCategories?.formattedData}
                    onClick={onClick}
                />
            </ProductSidebarWrapper>
            <ProductListWrapper isLoading={isLoadingCategpories || isLoadingProducts}>
                <ProductList
                    handleSelect={handleSelect}
                    data={dataProducts?.productListAll_DataFormat}
                />
            </ProductListWrapper>
        </ProductContainer>
    )
}

export default Products