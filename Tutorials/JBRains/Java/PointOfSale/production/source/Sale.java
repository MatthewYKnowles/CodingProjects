public class Sale {
    private final Catalog catalog;
    private Display display;
    private String scannedPrice;

    public Sale(Display display, Catalog catalog) {
        this.display = display;
        this.catalog = catalog;
    }

    public void onBarcode(String barcode) {
        if ("".equals(barcode)) {
            display.displayEmptyBarcodeMessage();
            return;
        }
        scannedPrice = catalog.findThenFormatPrice(barcode);
        if (scannedPrice == null) {
            display.displayProductNotFoundMessage(barcode);
        } else {
            display.displayPrice(formatMonetaryAmount(scannedPrice));
        }
    }

    public void onTotal() {
        boolean saleInProcess = !(scannedPrice == null);
        if (saleInProcess) {
             display.displayPurchaseTotal(formatMonetaryAmount(scannedPrice));
        } else {
            display.displayNoSaleInProgressMessage();
        }
    }

    private String formatMonetaryAmount(String priceAsText) {
        return priceAsText;
    }

}
