import useCountriesData from '../../hooks/useCountriesData'
import useResData from '../../hooks/useResData'
import { useRef, useState } from 'react';
import Select from "react-select";
import { validatePosInteger, validateOptionSelected } from '../../utils/validators.js';
import { Options, customStyles } from '../../utils/helpers.js';


const CreateAmendment = ({setCreateNewAmendment}) => {
    const { data: countriesData, isLoading: isCountriesLoading, isError: isCountryError } = useCountriesData();
    const { data: resolutionsData, isLoading: isResolutionsLoading, isError: isResolutionsError } = useResData();

}