import { useMemo } from "react";

export const to_from = (navigate, from) => {
  navigate(from, { replace: true });
};

export const to_dashboard = (navigate) => {
  navigate("/Delegates/Dashboard", { replace: true });
};

export const to_admin_dashboard = (navigate) => {
  navigate("/Admin/Dashboard", { replace: true });
};

export const Options = (countriesData) => {
  useMemo(()=>{
  if (!countriesData) return [];
    return countriesData.map(country => ({
    value: country.id,
    label: country.country,
    }));
    }, [countriesData]);
  }

export const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: "12px 20px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      border: "none",
      marginTop: "5px",
      marginBottom: "20px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#242424',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#414559' : '#242424',
      marginStart: '10px',
      marginEnd: '10px',
      color: '#ffffff',
    }),
  }

export const filterResolutionsByCouncil = (countriesData, id) => {
  return resolutions.filter(resolution => resolution.council_id === id)
}