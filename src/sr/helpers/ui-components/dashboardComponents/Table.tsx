import React from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'
interface businessTypeApiResponse {
  name?: string
  imagePath?: string
  createdAt: string
  updatedAt: string
  id: string
}
interface categoryApiResponse {
  name: string
  imagePath?: string
  createdAt: string
  updatedAt: string
  id: string
  taxCode?: string
}
interface subCategoryApiResponse {
  name: string
  categoryId?: string
  taxCode: string
  createdAt: string
  updatedAt: string
  id: string
}

interface tableProps {
  setSelectedData: React.Dispatch<React.SetStateAction<any>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  categoriesData:
    | categoryApiResponse[]
    | businessTypeApiResponse[]
    | subCategoryApiResponse[]
    | undefined
  handleDelete: (id: string) => Promise<void>
  handleView?: (fileUrl: string | undefined) => Promise<void>
  topicName: string
}

const Table: React.FC<tableProps> = (props) => {
  const handleDelete = async (id: string) => {
    await props.handleDelete(id)
  }

  return (
    <>
      <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Name
              </th>
              {props.topicName != 'Sub Category' && (
                <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                  Attachments
                </th>
              )}
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created At
              </th>
              <th className='px-5 py-5  bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Updated At
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {props.categoriesData?.map(
              (category: categoryApiResponse | businessTypeApiResponse) => (
                <tr key={category.id} className='odd:bg-white even:bg-gray-50'>
                  <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                    <div className='flex items-center'>
                      <p className='text-gray-900 whitespace-no-wrap'>{category.name}</p>
                    </div>
                  </td>
                  {props.topicName != 'Sub Category' && (
                    <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                      <p
                        className={`${
                          category.imagePath == null
                            ? 'text-gray-900'
                            : 'text-blue-500 hover:cursor-pointer hover:font-medium'
                        }  whitespace-no-wrap  `}
                        onClick={async () => {
                          if (props.handleView) await props.handleView(category.imagePath)
                        }}
                      >
                        {category.imagePath == null ? '' : 'View'}
                      </p>
                    </td>
                  )}

                  <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{category.createdAt}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{category.updatedAt}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                    <div className='flex'>
                      <FaEdit
                        className='text-blue-500 cursor-pointer mr-4 h-4 w-4'
                        onClick={() => {
                          console.log('category', category.name)
                          props.setSelectedData(category)
                          props.setIsUpdateModalOpen(true)
                        }}
                      />
                      <FaTrash
                        className='text-red-500 cursor-pointer ml-4 h-4 w-4'
                        onClick={async () => {
                          await handleDelete(category.id)
                        }}
                      />
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
