import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import {
  HeaderInventory,
  SimpleList,
  DetailedList,
  EditProductModal,
  InventoryFooter,
  ReviewOCRModal,
} from '../../components/nonReusable';
import {
  useFetchInventory,
  useProductActions,
  useSorting,
  useFilterModal,
  useSyncInventory
} from '../../hooks';
import { InventoryItem } from '../../types/types';
import { useAuth } from '../../context/AuthContext';
import { Container, LoadingContainer, ContentContainer } from './InventoryScreen.styles';

/**
 * InventoryScreen component handles the display and management of the inventory list.
 *
 * 
 * @returns {JSX.Element} The rendered InventoryScreen component.
 */
const InventoryScreen: React.FC = () => {
  const { token } = useAuth();
  const { inventoryData, loading, setInventoryData } = useFetchInventory();
  const { handleDeleteItem, handleEditItem, handleAddItem } = useProductActions(inventoryData, setInventoryData);
  const { filteredData, setFilteredData, sortOption, sortDescending, handleSort, toggleSortOrder } = useSorting(inventoryData);
  const { handleApplyFilters } = useFilterModal(inventoryData, Math.max(...inventoryData.map(item => item.quantity)));
  useSyncInventory(token);

  const [detailedView, setDetailedView] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [ocrData, setOcrData] = useState<InventoryItem[]>([]);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  useEffect(() => {
    setFilteredData(inventoryData);
  }, [inventoryData]);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator testID="loading-indicator" size="large" color="#050315" />
      </LoadingContainer>
    );
  }

  /**
   * Handles the edit action for an inventory item.
   *
   * @param {InventoryItem} item - The item to edit.
   */
  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setEditModalVisible(true);
  };

  /**
   * Handles saving changes to an inventory item.
   *
   * @param {InventoryItem} updatedItem - The updated item.
   */
  const handleSaveChanges = (updatedItem: InventoryItem) => {
    handleEditItem(updatedItem);
    setEditModalVisible(false);
  };

  /**
   * Handles adding a new product to the inventory.
   *
   * @param {InventoryItem} newItem - The new item to add.
   */
  const handleAddProduct = (newItem: InventoryItem) => {
    handleAddItem(newItem);
  };

  /**
   * Handles filtering the inventory data.
   *
   * @param {any} filters - The filters to apply.
   */
  const handleFilter = (filters: any) => {
    const filteredData = handleApplyFilters(filters);
    setFilteredData(filteredData);
  };

  /**
   * Handles scanning a ticket and processing the scanned data.
   *
   * @param {InventoryItem[]} scannedData - The scanned data.
   */
  const handleScanTicket = (scannedData: InventoryItem[]) => {
    setOcrData(scannedData);
    setReviewModalVisible(true);
  };

  return (
    <Container>
      <HeaderInventory
        title="INVENTORY"
        toggleView={() => setDetailedView(!detailedView)}
        detailedView={detailedView}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ContentContainer>
          {detailedView ? (
            <DetailedList
              data={filteredData}
              onEditItem={handleEdit}
              onDeleteItem={handleDeleteItem}
            />
          ) : (
            <SimpleList
              data={filteredData}
              onDeleteItem={handleDeleteItem}
              onEditItem={handleEdit}
            />
          )}
        </ContentContainer>
      </ScrollView>
      {selectedItem && (
        <EditProductModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onSave={handleSaveChanges}
          existingLocations={[...new Set(inventoryData.map(item => item.location))]}
          existingShops={[...new Set(inventoryData.map(item => item.store))]}
          item={selectedItem}
        />
      )}
      <InventoryFooter
        toggleView={() => setDetailedView(!detailedView)}
        detailedView={detailedView}
        onAddProduct={handleAddProduct}
        onFilter={handleFilter}
        onSort={handleSort}
        toggleSortOrder={toggleSortOrder}
        sortDescending={sortDescending}
        existingLocations={[...new Set(inventoryData.map(item => item.location))]}
        existingShops={[...new Set(inventoryData.map(item => item.store))]}
        inventoryData={filteredData}
        originalData={inventoryData}
        onScanTicket={handleScanTicket}
      />
      <ReviewOCRModal
        visible={reviewModalVisible}
        onClose={() => setReviewModalVisible(false)}
        onAdd={(newItem) => handleAddProduct(newItem)}
        onDiscard={() => {}}
        onCancel={() => setReviewModalVisible(false)}
        ocrData={ocrData}
        existingLocations={[...new Set(inventoryData.map(item => item.location))]}
        existingShops={[...new Set(inventoryData.map(item => item.store))]}
      />
    </Container>
  );
};

export default InventoryScreen;

