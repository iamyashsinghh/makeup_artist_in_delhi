import dynamic from 'next/dynamic';
import { useGlobalContext } from "@/context/MyContext";

const Header = dynamic(() => import('@/components/layout.js/Header'));
const Pagedescription = dynamic(() => import('@/components/miscellaneous/pagedescription/PageDescription'));
const VendorTopFilter = dynamic(() => import('@/components/miscellaneous/VendorTopFilter'));
const VendorContainer = dynamic(() => import('./vendorcontainer/VendorContainer'));
const SideFilter = dynamic(() => import('./filter/SideFilter'));

export default function VendorListPage(props) {
  const { category, city, locality, result, localities, filterQuery } = props.data;
  const { vendorCategories, venueCategories } = useGlobalContext();

  return (
    <>
      <SideFilter
        category={category}
        localities={localities}
        city={city}
        vendorCategories={vendorCategories}
        locality={locality}
        filterQuery={filterQuery}
      />
      <Header />
      <VendorTopFilter
        category={category}
        localities={localities}
        city={city}
        vendorCategories={vendorCategories}
        locality={locality}
        filterQuery={filterQuery}
      />
      <VendorContainer 
        lists={result.data}
        locality={locality}
        category={category}
        count={result.count}
        city={city}
        localities={localities}
        venueCategories={venueCategories}
        vendorCategories={vendorCategories}
        filterQuery={filterQuery}
      />
      <Pagedescription caption={result.meta?.caption} />
    </>
  );
}
