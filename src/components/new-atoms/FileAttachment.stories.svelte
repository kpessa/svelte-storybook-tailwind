<script lang="ts">
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import FileAttachment from './FileAttachment.svelte';

  // Helper function to create a File object
  function createFile(name: string, type: string, size: number): File {
    return new File([''], name, { type });
  }

  // Mock files for stories
  const imageFile = createFile('photo.jpg', 'image/jpeg', 1024 * 1024 * 2.5); // 2.5MB
  const pdfFile = createFile('document.pdf', 'application/pdf', 1024 * 512); // 512KB
  const docFile = createFile(
    'report.docx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    1024 * 256
  ); // 256KB
  const zipFile = createFile('archive.zip', 'application/zip', 1024 * 1024 * 10); // 10MB

  // Mock image URL for preview
  const mockImageUrl = 'https://picsum.photos/200';

  function handleRemove() {
    alert('Remove clicked');
  }
</script>

<Meta
  title="Atoms/FileAttachment"
  component={FileAttachment}
  argTypes={{
    showRemoveButton: { control: 'boolean' }
  }} />

<!-- Image file with preview -->
<Story name="Image Preview">
  <div class="p-4">
    <FileAttachment file={imageFile} previewUrl={mockImageUrl} onRemove={handleRemove} />
  </div>
</Story>

<!-- PDF document -->
<Story name="PDF Document">
  <div class="p-4">
    <FileAttachment file={pdfFile} onRemove={handleRemove} />
  </div>
</Story>

<!-- Word document -->
<Story name="Word Document">
  <div class="p-4">
    <FileAttachment file={docFile} onRemove={handleRemove} />
  </div>
</Story>

<!-- ZIP archive -->
<Story name="ZIP Archive">
  <div class="p-4">
    <FileAttachment file={zipFile} onRemove={handleRemove} />
  </div>
</Story>

<!-- Without remove button -->
<Story name="Without Remove Button">
  <div class="p-4">
    <FileAttachment file={pdfFile} showRemoveButton={false} />
  </div>
</Story>

<!-- Multiple attachments -->
<Story name="Multiple Attachments">
  <div class="flex flex-col gap-3 p-4">
    <FileAttachment file={imageFile} previewUrl={mockImageUrl} onRemove={handleRemove} />
    <FileAttachment file={pdfFile} onRemove={handleRemove} />
    <FileAttachment file={docFile} onRemove={handleRemove} />
  </div>
</Story>
