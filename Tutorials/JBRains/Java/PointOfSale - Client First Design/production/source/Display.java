public interface Display {
    void displayPrice(Price price);

    void displayProductNotFoundMessage(String barcode);

    void displayEmptyBarcodeMessage();
}