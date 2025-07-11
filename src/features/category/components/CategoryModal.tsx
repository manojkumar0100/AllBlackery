import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import useCategoryCreate from '../hooks/useCategoryCreate';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { categoryCreateSchema } from '../schemas/CategorySchema';
import categoryIcons from '@/contants/category-icon';
import { useEffect } from 'react';
import useCategoryUpdate from '../hooks/useCategoryUpdate';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IInputFields {
  name: string;
  icon: string;
}

interface ICategoryModalProps {
  selectedCategory: ICategory | undefined;
  setSelectedCategory: (category: ICategory | undefined) => void;
  open: boolean;
  setOpenAddOrUpdateModal: (open: boolean) => void;
}

export default function CategoryModal({
  selectedCategory,
  setSelectedCategory,
  open,
  setOpenAddOrUpdateModal,
}: ICategoryModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IInputFields>({
    resolver: yupResolver(categoryCreateSchema),
  });

  const handleClose = () => {
    setOpenAddOrUpdateModal(false);
    reset();
  };

  const handleOpen = (mode: string) => {
    if (mode === 'add') setSelectedCategory(undefined);

    setOpenAddOrUpdateModal(true);
  };

  const categoryCreate = useCategoryCreate(handleClose);
  const categoryUpdate = useCategoryUpdate(handleClose);

  // TEST

  const handleChange = (event: SelectChangeEvent) => {
    setValue('icon', event.target.value);
  };

  const onSubmit: SubmitHandler<IInputFields> = (data) => {
    if (selectedCategory) {
      const updateData = { id: selectedCategory.id, category: data };
      console.log('check updateData', updateData);
      categoryUpdate.mutate(updateData);
    } else {
      categoryCreate.mutate(data);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setValue('name', selectedCategory.name);
      setValue('icon', selectedCategory.icon);
    }
  }, [selectedCategory, setValue]);

  return (
    <div>
      <Button variant='contained' onClick={() => handleOpen('add')}>
        Add Category
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ marginBottom: '10px' }}
          >
            Category
          </Typography>
          <TextField
            label='Name'
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '10px' }}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            {...register('name')}
          />
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Icon</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Icon'
              defaultValue={selectedCategory ? selectedCategory.icon : ''}
              onChange={handleChange}
            >
              {Object.keys(categoryIcons).map((categoryKey) => {
                return (
                  <MenuItem key={categoryKey} value={categoryKey}>
                    {categoryIcons[categoryKey]} - {categoryKey}
                  </MenuItem>
                );
              })}
            </Select>
            {errors.icon && (
              <Typography color='error'>{errors.icon?.message}</Typography>
            )}
          </FormControl>

          <Button type='submit' variant='contained' fullWidth>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
