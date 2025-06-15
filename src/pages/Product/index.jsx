import React, { useState } from "react"
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

    const [state, setState] = useState({
            name: '',
            nameInput: '',
            dataFindByImage:'',
            openModalFindByImage: false,
        });

    const { isLoading: isLoadingCategpories, data: dataCategories } = useGetCategories(params);
    const { isLoading: isLoadingProducts, data: dataProducts } = useGetProducts(location, params, state.name);

    const onClick = ({item, key, keyPath}) => {
        setState((prev) => ({ ...prev, name: '', dataFindByImage:'', }));
        console.log({item});
        navigate(
            {
                pathname: `/products/${item?.props?.route}`,
            },
            {
                state: {
                    key: key,
                    value: item?.props?.route ?? ''
                }
            }
        )
    }

    const handleSelect = (_, option) => {
        setState((prev) => ({ ...prev, dataFindByImage:'', }));
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

    const onSearch = (value, _e, info) => {
        setState((prev) => ({ ...prev, name: value }));
    }

    const onChange = (value) => {
        setState((prev) => ({ ...prev, nameInput: value }));
    }

    const handleOpenModalFindByImage = () => {
        setState((prev) => ({ ...prev, openModalFindByImage: !state.openModalFindByImage }));
    }

    const handleDataFindByImage = (value) => {
        setState((prev) => ({ ...prev, dataFindByImage: value }));
    }

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
                    openModalFindByImage={state.openModalFindByImage}
                    handleOpenModalFindByImage={handleOpenModalFindByImage}
                    name={state.nameInput}
                    onChange={onChange}
                    handleSelect={handleSelect}
                    onSearch={onSearch}
                    data={state.dataFindByImage !== '' ? state.dataFindByImage : dataProducts?.productListAll_DataFormat}
                    handleDataFindByImage={handleDataFindByImage}
                />
            </ProductListWrapper>
        </ProductContainer>
    )
}

export default Products