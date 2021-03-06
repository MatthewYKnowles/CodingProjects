#include <stdio.h>
#include <stdlib.h>
 #include "bmp.h"
 int main(int argc, char *argv[])
{
    // ensure proper usage
    if (argc != 4)
    {
        fprintf(stderr, "Usage: ./resize resizeFactor infile outfile\n");
        return 1;
    }
     int resizeFactor = atoi(argv[1]);
    if (resizeFactor < 1 || resizeFactor > 100) {
        fprintf(stderr, "Must be integer between 1 and 100\n");
        return 1;
    }
     // remember filenames
    char *infile = argv[2];
    char *outfile = argv[3];
     // open input file
    FILE *inptr = fopen(infile, "r");
    if (inptr == NULL)
    {
        fprintf(stderr, "Could not open %s.\n", infile);
        return 2;
    }
     // open output file
    FILE *outptr = fopen(outfile, "w");
    if (outptr == NULL)
    {
        fclose(inptr);
        fprintf(stderr, "Could not create %s.\n", outfile);
        return 3;
    }
     // read infile's BITMAPFILEHEADER
    BITMAPFILEHEADER bf;
    fread(&bf, sizeof(BITMAPFILEHEADER), 1, inptr);
     // read infile's BITMAPINFOHEADER
    BITMAPINFOHEADER bi;
    fread(&bi, sizeof(BITMAPINFOHEADER), 1, inptr);
     // ensure infile is (likely) a 24-bit uncompressed BMP 4.0
    if (bf.bfType != 0x4d42 || bf.bfOffBits != 54 || bi.biSize != 40 ||
        bi.biBitCount != 24 || bi.biCompression != 0)
    {
        fclose(outptr);
        fclose(inptr);
        fprintf(stderr, "Unsupported file format.\n");
        return 4;
    }
     // determine padding for scanlines
    int sourcePadding = (4 - (bi.biWidth * sizeof(RGBTRIPLE)) % 4) % 4;
     //save old height and width
    int sourceWidth = bi.biWidth;
    int sourceHeight = bi.biHeight;
     //set new height and width
    bi.biWidth *= resizeFactor;
    bi.biHeight *= resizeFactor;
     int newPadding = (4 - (bi.biWidth * sizeof(RGBTRIPLE)) % 4) % 4;
     bi.biSizeImage = ((sizeof(RGBTRIPLE) * bi.biWidth) + newPadding) * abs(bi.biHeight);
    bf.bfSize =  bi.biSizeImage + sizeof(BITMAPFILEHEADER) + sizeof(BITMAPINFOHEADER);
     // write outfile's BITMAPFILEHEADER
    fwrite(&bf, sizeof(BITMAPFILEHEADER), 1, outptr);
     // write outfile's BITMAPINFOHEADER
    fwrite(&bi, sizeof(BITMAPINFOHEADER), 1, outptr);
     for (int h = 0; h < abs(sourceHeight); h++)
    {
        // iterate over infile's scanlines
        for (int i = 0; i < resizeFactor; i++)
        {
            //save current position is source image file
            unsigned long position = ftell(inptr);
             // iterate over pixels in scanline
            for (int j = 0; j < sourceWidth; j++)
            {
                // temporary storage
                RGBTRIPLE triple;
                 // read RGB triple from infile
                fread(&triple, sizeof(RGBTRIPLE), 1, inptr);
                 for (int k = 0; k < resizeFactor; k++)
                {
                    // write RGB triple to outfile
                    fwrite(&triple, sizeof(RGBTRIPLE), 1, outptr);
                }
            }
             // skip over padding, if any
            fseek(inptr, sourcePadding, SEEK_CUR);
             // then add it back (to demonstrate how)
            for (int k = 0; k < newPadding; k++)
            {
                fputc(0x00, outptr);
            }
             //if its the last copied vertical line do not go back to the beginning of the line
            if (resizeFactor - i != 1) {
                fseek(inptr, position, SEEK_SET);
            }
        }
    }
     // close infile
    fclose(inptr);
     // close outfile
    fclose(outptr);
     // success
    return 0;
}