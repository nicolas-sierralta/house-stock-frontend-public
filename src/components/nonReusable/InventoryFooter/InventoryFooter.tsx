import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SortModal from '../SortModal/SortModal';
import AddProductModal from '../AddProductModal/AddProductModal';
import FilterModal from '../FilterModal/FilterModal';
import ScanTicketModal from '../ScanTicketModal/ScanTicketModal';
import {
  FooterContainer,
  FooterButton,
  FooterButtonContent,
  FooterButtonText
} from './InventoryFooter.styles';
import { FooterProps } from './InventoryFooter.types';
import { InventoryItem } from '../../../types/types';

/**
 * InventoryFooter component provides the footer actions for the inventory screen, including filtering, sorting, adding products, and scanning tickets.
 *
 * 
 * @param {FooterProps} props - The props for the InventoryFooter component.
 * @returns {JSX.Element} The rendered InventoryFooter component.
 */
const InventoryFooter: React.FC<FooterProps> = ({
  toggleView,
  detailedView,
  onAddProduct,
  onFilter,
  onSort,
  toggleSortOrder,
  sortDescending,
  existingLocations,
  existingShops,
  inventoryData,
  originalData,
  onScanTicket,
}) => {
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [scanModalVisible, setScanModalVisible] = useState(false);

  const handleScanComplete = (data: InventoryItem[]) => {
    onScanTicket(data);
    setScanModalVisible(false);
  };

  return (
    <>
      <FooterContainer>
        <FooterButton onPress={() => setFilterModalVisible(true)}>
          <FooterButtonContent>
            <FooterButtonText>
              <Icon name="filter-list" size={30} color="#050315" />{" "}
            </FooterButtonText>
            <FooterButtonText>Filtrar</FooterButtonText>
          </FooterButtonContent>
        </FooterButton>
        <FooterButton onPress={() => setSortModalVisible(true)}>
          <FooterButtonContent>
            <FooterButtonText>
              <Icon name="sort" size={30} color="#050315" />{" "}
            </FooterButtonText>
            <FooterButtonText>Ordenar</FooterButtonText>
          </FooterButtonContent>
        </FooterButton>
        <FooterButton onPress={() => setScanModalVisible(true)}>
          <FooterButtonContent>
            <FooterButtonText>
              <Icon name="camera-alt" size={32} color="#433bff" />{" "}
            </FooterButtonText>
            <FooterButtonText>Escanear</FooterButtonText>
          </FooterButtonContent>
        </FooterButton>
        <FooterButton onPress={() => setAddModalVisible(true)}>
          <FooterButtonContent>
            <FooterButtonText>
              <Icon name="add-circle" size={30} color="#050315" />{" "}
            </FooterButtonText>
            <FooterButtonText>Añadir</FooterButtonText>
          </FooterButtonContent>
        </FooterButton>
        <FooterButton onPress={toggleSortOrder}>
          <FooterButtonContent>
            <FooterButtonText>
              <Icon
                name={sortDescending ? "arrow-downward" : "arrow-upward"}
                size={30}
                color="#050315"
              />{" "}
            </FooterButtonText>
            <FooterButtonText>
              {sortDescending ? "Descendente" : "Ascendente"}
            </FooterButtonText>
          </FooterButtonContent>
        </FooterButton>
      </FooterContainer>
      <SortModal
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
        onSort={onSort}
      />
      <AddProductModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAdd={onAddProduct}
        existingLocations={existingLocations}
        existingShops={existingShops}
      />
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApplyFilters={onFilter}
        originalData={originalData}
        maxQuantity={Math.max(...inventoryData.map(item => item.quantity))}
      />
      <ScanTicketModal
        visible={scanModalVisible}
        onClose={() => setScanModalVisible(false)}
        onScan={handleScanComplete}
      />
    </>
  );
};

export default InventoryFooter;
